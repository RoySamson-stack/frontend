
// export const baseUrl = process.env.REACT_APP_API_URL || 'http://192.168.250.230:5000/v1';
// export const baseUrl = process.env.REACT_APP_API_URL || ' http://192.168.100.4:5000/v1/';
export const prodUrl = 'https://scammer-backend.vercel.app/v1';

export  const endpoints = {
    //USER ENDPOINTS
    CREATE_USER: `${prodUrl}/auth/register`,
    GET_USER_PROFILE: `${prodUrl}/auth/users/:id`,
    LOGIN: `${prodUrl}/auth/login`,
    UPDATE_USER_PROFILE: `${prodUrl}/auth/users/:id`,
    GET_USER_REPORTS: `${prodUrl}/reports/my-reports`,
    TOKEN: `${prodUrl}/auth/refresh-token`,
    FORGOT_PASSWORD: `${prodUrl}/auth/forgot-password`,
    RESET_PASSWORD: `${prodUrl}/auth/reset-password`,
    LOGOUT: `${prodUrl}/auth/logout`,

    // REPORTS ENDPOINTS
    CREATE_REPORT: `${prodUrl}/reports/create`,
    GET_ALL_REPORTS: `${prodUrl}/reports/allReports`,
    GET_TRENDING_REPORTS: `${prodUrl}/reports/trending`,
    GET_REPORT_BY_ID: `${prodUrl}/reports/:id`,
    UPDATE_REPORT_STATUS: `${prodUrl}/reports`,
    VOTE_ON_REPORT: `${prodUrl}/reports/:id/vote`,
    EDIT_REPORT: `${prodUrl}/reports/:id/update`,
    DELETE_REPORT: `${prodUrl}/reports`,

    // NOTIFICATIONS ENDPOINTS
    GET_USER_NOTIFICATIONS: `${prodUrl}/users/:id/notifications`,
    GET_ALL_NOTIFICATIONS: `${prodUrl}/notifications`,
    MARK_NOTIFICATION_READ: `${prodUrl}/notifications`,
    MARK_ALL_NOTIFICATIONS_READ: `${prodUrl}/users/:id/notifications`,

    // ANALYTICS ENDPOINTS
    GET_ANALYTICS: `${prodUrl}/analytics/reports`,
    HEALTH_CHECK: `${prodUrl}/health`,


    //ADMIN ENDPOINTS
    GET_ALL_USER: `${prodUrl}/users`,
    GET_ALL_REPORTS_ADMIN: `${prodUrl}/admin/reports`,
    UPDATE_USER: `${prodUrl}/users`,
    UPDATE_ADMIN_REPORT_STATUS: `${prodUrl}/reports/:id`,
    VOTE_ADMIN_ON_REPORT: `${prodUrl}/reports/:id/vote`,
    DELETE_ADMIN_REPORT: `${prodUrl}/reports/:id`,
    GET_ADMIN_ANALYTICS: `${prodUrl}/analytics/reports`,
    HEALTH_ADMIN_CHECK: `${prodUrl}/health`,

};

    