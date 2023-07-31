import copy from 'copy-to-clipboard'
import { useCallback, useEffect, useState } from 'react'
import { toastr } from 'react-redux-toastr'

export const useCopyToClipboard = (resetInterval: number | null = null) => {
	const [isCopied, setCopied] = useState<boolean>(false)

	const handleCopy = useCallback(
		({
			text,
			textError,
			textSuccess
		}: {
			text: string | number
			textError: string
			textSuccess: string
		}) => {
			if (typeof text === 'string') {
				copy(text.toString())
				setCopied(true)
				toastr.success('Success', textSuccess)
			} else {
				setCopied(false)
				toastr.error('Error', textError)
			}
		},
		[]
	)

	useEffect(() => {
		let timeout: NodeJS.Timeout
		if (isCopied && resetInterval) {
			timeout = setTimeout(() => setCopied(false), resetInterval)
		}
		return () => {
			clearTimeout(timeout)
		}
	}, [isCopied, resetInterval])

	return { isCopied, handleCopy }
}
