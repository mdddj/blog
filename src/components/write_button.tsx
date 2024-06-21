import React from "react";

const SvgComponent = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="currentColor"
        viewBox="0 0 1024 1024"
    >
        <path
            fill="#5E6570"
            d="M918.4 314.656 671.584 72.672c-6.08-5.92-14.016-8.672-22.752-9.12-8.512.096-16.64 3.552-22.56 9.632l-459.2 470.4c-4.416 4.512-7.392 10.272-8.576 16.448L96.544 890.688c-1.984 10.592 1.472 21.44 9.216 28.896a31.977 31.977 0 0 0 22.24 9.024c2.304 0 4.672-.256 6.976-.768l292.448-65.216c6.112-1.344 11.712-4.512 16.064-9.024l475.584-493.856c12.16-12.672 11.872-32.8-.672-45.088zM428.352 803.104c-6.304 6.688-14.784 10.048-23.296 10.048a32.073 32.073 0 0 1-21.952-8.672L200.992 633.088c-12.864-12.128-13.472-32.384-1.344-45.248s32.352-13.472 45.248-1.376l182.112 171.392c12.864 12.128 13.472 32.352 1.344 45.248z"
        />
    </svg>
)


const WriteButton: React.FC = () => {
    return <div>
        <button type={'button'} className="btn btn-circle hidden md:flex md:fixed md:bottom-4 md:right-4"
                onClick={() => window.location.href = "https://admin.itbug.shop/blog/add"}>
            <div className={'tooltip tooltip-top'} data-tip={'发布新博客'}>
                <SvgComponent/>
            </div>
        </button>
    </div>
}

export default WriteButton
