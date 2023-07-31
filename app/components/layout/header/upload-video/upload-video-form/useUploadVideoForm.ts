import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IMediaResponse } from '@/services/media/interfaces/media.interface'

import { IVideoDto } from '@/types/video.interface'

import { videoApi } from '@/store/api/video.api'

interface IUseUploadVideoForm {
	handleCloseModal: () => void
	videoId: number
}

export const useUploadVideoForm = ({
	handleCloseModal,
	videoId
}: IUseUploadVideoForm) => {
	const {
		register,
		formState: { errors },
		control,
		handleSubmit,
		watch,
		setValue,
		reset
	} = useForm<IVideoDto>({
		mode: 'onChange'
	})
	const [videoDuration, setVideoDuration] = useState<number>(0)

	const [updateVideo, { isSuccess }] = videoApi.useUpdateVideoMutation()

	const onSubmit: SubmitHandler<IVideoDto> = data => {
		updateVideo({
			...data,
			duration: videoDuration,
			id: videoId
		})
			.unwrap()
			.then(() => {
				handleCloseModal()
				reset()
			})
	}

	const videoPath = watch('videoPath')
	const thumbnailPath = watch('thumbnailPath')
	const [videoFileName, setVideoFileName] = useState<string>('')
	const handleUploadVideo = (value: IMediaResponse) => {
		setValue('videoPath', value.url)
		setValue('name', value.name)
		setVideoFileName(value.name)
	}

	const [isChosen, setIsChosen] = useState<boolean>(false)

	const [percent, setPercent] = useState<number>(0)
	const [isUploaded, setIsUploaded] = useState<boolean>(false)
	const setProgressPercentage = (val: number) => {
		setPercent(val)
		if (val === 100) setIsUploaded(true)
	}

	return {
		form: {
			register,
			errors,
			control,
			handleSubmit,
			setVideoDuration,
			onSubmit
		},
		media: {
			videoPath,
			thumbnailPath,
			videoFileName,
			videoDuration,
			handleUploadVideo
		},
		status: {
			isSuccess,
			isChosen,
			setIsChosen,
			percent,
			isUploaded,
			setProgressPercentage
		}
	}
}
