/* eslint-disable react/prop-types */
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function SelectLottie({ id }) {
    const urls = [
        "https://lottie.host/8e640a49-497d-45b2-b439-a2ee185af4c2/6SgcKVhTyM.lottie",
        "https://lottie.host/dfd34c36-2578-49f5-8389-2b417b49b34a/f6coF2spUn.lottie",
        "https://lottie.host/e6741b09-07db-4ff8-a91f-f75c07cd1cd0/H00UCMpEHZ.lottie",
    ];

    return (
        <DotLottieReact src={urls[id]} loop autoplay />
    );
}

export default function Lotties() {
    return (
        <div className='lotties'>
            <SelectLottie id={0} />
            <SelectLottie id={1} />
            <SelectLottie id={2} />
        </div>
    );
}
