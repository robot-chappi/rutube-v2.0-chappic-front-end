import { FC } from 'react'

const SuccessMessage: FC<{ title: string }> = ({ title }) => {
	return (
		<div className='absolute top-5 left-1/4 text-lg p-2 z-10 flex items-center justify-center shadow-block animate-scaleIn w-1/2 bg-green-500 text-white text-center mx-auto'>
			{title}
		</div>
	)
}

export default SuccessMessage
