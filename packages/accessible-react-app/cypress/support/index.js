// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-axe';

const addContext = require('mochawesome/addContext')
const axeErrors = [];

Cypress.on('test:after:run', (test, runnable) => {
    if (test.state === 'failed') {
        const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed).png`
        addContext({ test }, `assets/${Cypress.spec.name}/${screenshotFileName}`)
        
        while( axeErrors.length > 0 ){
            let error = axeErrors.pop();

            addContext( { test }, {
                title: error.ruleId,
                value: error.info
            });
        }// end if
    }// end if
});

Cypress.on( 'log:added', ( attrs, log ) => {
    let axeErrorsObj = {};
    let consoleProps = attrs.consoleProps;

    if( consoleProps.Command === 'a11y error!' ){
        axeErrorsObj = {
            ruleId: consoleProps.id,
            info: {
                help: consoleProps.help,
                nodes: []
            }
        }

        let invalidNodes = consoleProps.nodes;
        let numNodes = invalidNodes.length;
        let i = 0;

        while( i < numNodes ){
            let node = invalidNodes[ i ];
            
            if( node.none.length > 0 ){
                axeErrorsObj.info.nodes.push( node.none[0] );
            }// end if

            if( node.any.length > 0 ){
                axeErrorsObj.info.nodes.push( node.any[0] );
            }// end if

            if( node.all.length > 0 ){
                axeErrorsObj.info.nodes.push( node.all[0] );
            }// end if
            
            axeErrorsObj.info.nodes.push( node.html )
            i++;
        }// end while

        axeErrors.push( axeErrorsObj );
    }// end if
});