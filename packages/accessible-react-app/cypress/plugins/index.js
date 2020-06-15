module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
    on('task', {
        log(message) {
            console.log(message)
            return null
        },
        table(message) {
            console.table(message)

            return null
        }
    })
}