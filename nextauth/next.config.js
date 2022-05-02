const {PHASE_DEVELOPMENT_SERVER} = require('next/constants')

module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                mongodb_user: 'hishamcse',
                mongodb_password: 'UtgzBJOQLRqG8O8z',
                mongodb_cluster: 'cluster1',
                mongodb_database: 'auth-dev',
                GOOGLE_CLIENT_ID: '410785066944-bqdk0r2g75df2pg7eemi5b4q0ic6ksh0.apps.googleusercontent.com',
                GOOGLE_CLIENT_SECRET: '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'
            }
        }
    }

    return {
        env: {
            mongodb_user: 'hishamcse',
            mongodb_password: 'UtgzBJOQLRqG8O8z',
            mongodb_cluster: 'cluster1',
            mongodb_database: 'auth',
            GOOGLE_CLIENT_ID: '410785066944-bqdk0r2g75df2pg7eemi5b4q0ic6ksh0.apps.googleusercontent.com',
            GOOGLE_CLIENT_SECRET: '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'
        }
    }
}