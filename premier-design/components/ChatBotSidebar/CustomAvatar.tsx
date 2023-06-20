import Image from 'next/image';
import React from 'react';
import { CustomAvatarProps } from './ChatBot.props';

const CustomAvatar = ({ src, alt }: CustomAvatarProps) => {
    return <Image src={src} alt={alt} width={50} height={50} />;
};

export default CustomAvatar;