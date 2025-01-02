import Image from 'next/image';
import React, {FC} from 'react';
import {CustomAvatarProps} from '../../interface/ChatBot.props';

const CustomAvatar: FC<CustomAvatarProps> = ({src, alt}) => {
    return <Image src={src} alt={alt} width={50} height={50}/>;
};

export default CustomAvatar;