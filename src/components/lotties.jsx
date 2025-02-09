import { DotLottieReact } from '@lottiefiles/dotlottie-react';


export function SelectLottie(id) {
console.log(id);
    /*     const urls = [
            "https://lottie.host/7f29a2ab-9681-49ea-8920-9be522a06e3d/VntHDstuwm.lottie",
            "https://assets6.lottiefiles.com/packages/lf20_3d9jwq5y.json",
            "https://assets6.lottiefiles.com/packages/lf20_3d9jwq5y.json",
        ] */
    /* <DotLottieReact src={urls[id]} background="transparent" speed="1" loop autoplay></DotLottieReact> */

    return (
        <DotLottieReact src="https://lottie.host/embed/fa231dce-8f8d-4e6b-9d0f-88d9ce5bb016/bdvVdxqjua.lottie" loop autoplay />
    );
}

export default function Lotties() {
    return (
        <div>
            <SelectLottie id={0} />
            <SelectLottie id={1} />
            <SelectLottie id={2} />
        </div>
    );
}
