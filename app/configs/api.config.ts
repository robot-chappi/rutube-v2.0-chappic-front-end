export const API_URL = `${process.env.APP_URL}/api`
export const API_SERVER_URL = `${process.env.APP_SERVER_URL}/api`

export const getAuthUrl = (string?: string) => `/auth${string ? string : ''}`
export const getUserUrl = (string?: string) => `/user${string ? string : ''}`
export const getVideoUrl = (string?: string) => `/video${string ? string : ''}`
export const getCommentUrl = (string?: string) =>
	`/comment${string ? string : ''}`
export const getPlaylistUrl = (string?: string) =>
	`/playlist${string ? string : ''}`
