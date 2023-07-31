import { GetServerSideProps } from 'next'
import { UserService } from '@/services/user/user.service'
import * as process from 'process'
import {
	getChannelLink,
	getPlaylistLink,
	getVideoLink
} from '../app/configs/app.config'
import dayjs from 'dayjs'
import { VideoService } from '@/services/video/video.service'
import { PlaylistService } from '@/services/playlist/playlist.service'

export default function SitemapXmlPage() {
	return null
}

export const getServerSideProps: GetServerSideProps = async ctx => {
	try {
		ctx.res.setHeader('Content-Type', 'text/xml')
		const xml = await generateSitemap()
		ctx.res.write(xml)
		ctx.res.end()

		return {
			props: {}
		}
	} catch (e) {
		return {
			props: {}
		}
	}
}

async function generateSitemap(): Promise<string> {
	const { data: channels } = await UserService.getAll()
	const { data: videos } = await VideoService.getAll()
	const { data: playlists } = await PlaylistService.getAll()

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${channels
	.map(
		channel =>
			`
	<url>
		<loc>${process.env.APP_URL + getChannelLink(String(channel.id))}</loc>
		<lastmod>${dayjs(new Date(channel.createdAt)).format('YYYY-MM-DD')}</lastmod>
	</url>
	`
	)
	.join('')}
${videos
	.map(
		video =>
			`
	<url>
		<loc>${process.env.APP_URL + getVideoLink(String(video.id))}</loc>
		<lastmod>${dayjs(new Date(video.createdAt)).format('YYYY-MM-DD')}</lastmod>
	</url>
	`
	)
	.join('')}
	${playlists
		.map(
			playlist =>
				`
	<url>
		<loc>${process.env.APP_URL + getPlaylistLink(String(playlist.id))}</loc>
		<lastmod>${dayjs(new Date(playlist.createdAt)).format('YYYY-MM-DD')}</lastmod>
	</url>
	`
		)
		.join('')}
</urlset>`
}
