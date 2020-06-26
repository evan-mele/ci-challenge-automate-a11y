/* ------------------------------------------------------------------------------------------------
 * terminalLog( violations )
 * 
 * Adds custom behavior when violations are discovered. When a cypress 'task' function is called:
 * - 'log' : Display statement with total number of accessibility options discovered in the test
 * - 'table' : Display violation data in tabulated form (violation id, impact/severity,
 *             description, and total number of violating nodes ).
 * ------------------------------------------------------------------------------------------------
 */
const terminalLog = ( violations => {
    cy.task(
        'log',
        `${violations.length} accessibility violation${
            violations.length === 1 ? '' : 's'
        } ${violations.length === 1 ? 'was' : 'were'} detected`
    )
    // pluck specific keys to keep the table readable
    const violationData = violations.map(
        ({ id, impact, description, nodes }) => ({
            id,
            impact,
            description,
            nodes: nodes.length
        })
    )

    cy.task('table', violationData);
});

module.exports = {
    terminalLog: terminalLog,
};