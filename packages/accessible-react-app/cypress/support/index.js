// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-axe';

const addContext = require('mochawesome/addContext')
const axeErrors = [];

Cypress.on('test:after:run', (test, runnable) => {
    if (test.state === 'failed') {
        const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed).png`
        addContext({ test }, `assets/${Cypress.spec.name}/${screenshotFileName}`)
        
        // Add the context of the axe-core errors collected from the log:added event
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

    // We want to retrieve the violation data for accessibility errors only
    if( consoleProps.Command === 'a11y error!' ){
        // Create a new object to pluck relevant details that we want to
        // present in the report
        axeErrorsObj = {
            ruleId: consoleProps.id,
            info: {
                help: consoleProps.help,
                nodes: []
            }
        }

        // Loop through and grab each of the violating nodes so that we can 
        // retrieve information from each
        let invalidNodes = consoleProps.nodes;
        let numNodes = invalidNodes.length;
        let i = 0;

        while( i < numNodes ){
            let node = invalidNodes[ i ];
            let nodeData;

            // A violating node will typically have data populated in one of 
            // the three arrays : none, any, or all.got
            if( node.none.length > 0 ){
                nodeData = node.none;
            }// end if

            if( node.any.length > 0 ){
                nodeData = node.any;
            }// end if

            if( node.all.length > 0 ){
                nodeData = node.all;
            }// end if
            
            // Add the html of the element that failed accessibility check
            nodeData[0]["html"] = node.html;

            // Add failure summary to the report
            let failureSummary = node.failureSummary;
            let failureSummaryArr = failureSummary.split("\n").map( item => {
                return item.trim();
            });

            // Remove the first item in the array and add it as the description
            nodeData[0]["failureSummary"] = {
                "description": failureSummaryArr.shift(),
                "items": failureSummaryArr
            };

            axeErrorsObj.info.nodes.push( nodeData );
            i++;
        }// end while

        axeErrors.push( axeErrorsObj );
    }// end if
});