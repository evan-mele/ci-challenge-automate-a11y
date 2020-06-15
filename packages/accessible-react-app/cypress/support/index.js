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
        if( invalidNodes.length > 0 ){
            let node = invalidNodes.pop();
            
            if( node.none.length > 0 ){
                axeErrorsObj.info.nodes = node.none;
            }// end if

            if( node.any.length > 0 ){
                axeErrorsObj.info.nodes = node.any;
            }// end if

            if( node.all.length > 0 ){
                axeErrorsObj.info.nodes = node.all;
            }// end if
        }// end if

        axeErrors.push( axeErrorsObj );
    }// end if
});