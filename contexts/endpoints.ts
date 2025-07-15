
export const baseUrl = process.env.REACT_APP_API_URL || 'http://192.168.250.230:5000/v1';


export  const endpoints = {
    //USER ENDPOINTS
    CREATE_USER: `${baseUrl}/auth/register`,
    GET_USER_PROFILE: `${baseUrl}/auth/users/:id`,
    LOGIN: `${baseUrl}/auth/login`,
    UPDATE_USER_PROFILE: `${baseUrl}/auth/users/:id`,
    GET_USER_REPORTS: `${baseUrl}/auth/users/:userId/reports`,
    TOKEN: `${baseUrl}/auth/refresh-token`,
    FORGOT_PASSWORD: `${baseUrl}/auth/forgot-password`,
    RESET_PASSWORD: `${baseUrl}/auth/reset-password`,
    LOGOUT: `${baseUrl}/auth/logout`,

    // REPORTS ENDPOINTS
    CREATE_REPORT: `${baseUrl}/reports`,
    GET_ALL_REPORTS: `${baseUrl}/reports`,
    GET_TRENDING_REPORTS: `${baseUrl}/reports/trending`,
    GET_REPORT_BY_ID: `${baseUrl}/reports/:id`,
    UPDATE_REPORT_STATUS: `${baseUrl}/reports`,
    VOTE_ON_REPORT: `${baseUrl}/reports/:id/vote`,
    DELETE_REPORT: `${baseUrl}/reports/:id`,

    // NOTIFICATIONS ENDPOINTS
    GET_USER_NOTIFICATIONS: `${baseUrl}/users/:id/notifications`,
    GET_ALL_NOTIFICATIONS: `${baseUrl}/notifications`,
    MARK_NOTIFICATION_READ: `${baseUrl}/notifications`,
    MARK_ALL_NOTIFICATIONS_READ: `${baseUrl}/users/:id/notifications`,

    // ANALYTICS ENDPOINTS
    GET_ANALYTICS: `${baseUrl}/analytics/reports`,
    HEALTH_CHECK: `${baseUrl}/health`,


    //ADMIN ENDPOINTS
    GET_ALL_USER: `${baseUrl}/users`,
    GET_ALL_REPORTS_ADMIN: `${baseUrl}/admin/reports`,
    UPDATE_USER: `${baseUrl}/users`,
    UPDATE_ADMIN_REPORT_STATUS: `${baseUrl}/reports/:id`,
    VOTE_ADMIN_ON_REPORT: `${baseUrl}/reports/:id/vote`,
    DELETE_ADMIN_REPORT: `${baseUrl}/reports/:id`,
    GET_ADMIN_ANALYTICS: `${baseUrl}/analytics/reports`,
    HEALTH_ADMIN_CHECK: `${baseUrl}/health`,

};

    