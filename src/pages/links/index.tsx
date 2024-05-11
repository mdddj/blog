import React from "react";
import {FriendLink} from "@/models/friend";
import CardTitle from "@/components/title";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {linkStore} from "@/providers/links";
import {useShallow} from "zustand/react/shallow";
import {showDialogModal} from "@/tools/fun";
import InputErrorLabel, {InputErrorClass} from "@/components/input_error_label";
import LinkItemLayout from "@/components/link_item_layout";
import TextComponent from "@/components/text";

export default function Page() {
    const [useEmail, setUseEmail] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const {
        register,
        handleSubmit,
        control,
        formState: {errors, disabled},
        reset
    } = useForm<FriendLink>();

    const [list, add] = linkStore(useShallow((state) => [state.data, state.add]));

    const onSubmit: SubmitHandler<FriendLink> = async (values) => {
        setIsLoading(true);
        try {
            await add(values);
        } catch (e) {
        }
        setIsLoading(false);
    };
    return (
        <div>
            <div className={'flex justify-between mb-4'}>
                <CardTitle title={"友链"}/>

                <div className={'flex gap-2'}>
                    <button type={'button'} className={'btn'} onClick={()=>showDialogModal('my-info-dialog')}>我的信息</button>
                    <button className={'btn btn-primary'} color={"primary"} type={'button'}
                            onClick={() => showDialogModal("request-link")}>
                        申请友链
                    </button>
                </div>
            </div>
            <div
                className={
                    "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
                }
            >
            {list.map((value) => {
                    return (
                        <LinkItemLayout link={value} key={value.id}/>
                    );
                })}

                {list.length === 0 && (
                    <span className={"text-default-500 text-sm"}>暂无友链</span>
                )}
            </div>


            <dialog id={'my-info-dialog'} className={'modal'}>
                <div className={'modal-box'}>
                    <h3 className={'font-bold text-lg mb-5'}>我的信息</h3>
                    <TextComponent  textKey={'my-info'}/>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/*申请弹窗*/}
            <dialog className={'modal'} id={'request-link'}>
            <div className={"modal-box"}>
                    <h3 className="font-bold text-lg mb-5">申请友链</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col justify-center gap-4'}>
                        <Controller control={control} render={({field, fieldState: {error}}) => {
                            return <label className={'form-control'}>
                                <input
                                    {...field}
                                    className={`input w-full input-bordered ${InputErrorClass(error?.message)}`}
                                    autoFocus={true}
                                    placeholder={"请输入站点名称"}
                                    {...register("name", {required: "请输入站点名称"})}
                                />
                                {InputErrorLabel(error?.message)}
                            </label>
                        }} name={"name"}/>
                        <Controller
                            control={control}
                            render={({field}) => {
                                const errorMsg = errors.url?.message
                                return (
                                    <label className={'form-control'}>
                                        <input
                                            className={`input w-full input-bordered ${InputErrorClass(errorMsg)}`}
                                            {...field}
                                            type={"url"}
                                            placeholder={"请输入URL"}
                                            {...register("url", {required: "请输入URL"})}
                                        />
                                        {InputErrorLabel(errorMsg)}
                                    </label>
                                );
                            }}
                            name={"url"}
                            rules={{
                                required: "请输入访问URL",
                                pattern: {
                                    value: /^(ftp|http|https):\/\/[^ "]+$/,
                                    message: "请输入有效的URL",
                                },
                            }}
                        />

                        <Controller
                            control={control}
                            render={({field, fieldState: {error}}) => {
                                return (
                                    <label className={'form-control'}>
                                        <input
                                            className={`input w-full input-bordered ${InputErrorClass(error?.message)}`}
                                            {...field}
                                            placeholder={"请输入LOGO直链"}
                                            {...register("logo", {required: "请输入logo"})}
                                        />
                                        {InputErrorLabel(error?.message)}
                                    </label>
                                );
                            }}
                            name={"logo"}
                            rules={{
                                required: "请输入站点logo"
                            }}
                        />
                        <textarea
                            className={'textarea w-full textarea-bordered'}
                            placeholder={"(可选)输入网站介绍"}
                            {...register("intro")}
                        />

                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">接收审核通过通知</span>
                                <input type="checkbox" className="toggle" checked={useEmail}
                                       onChange={(e) => setUseEmail(e.target.checked)}/>
                            </label>
                        </div>

                        {
                            useEmail && <Controller shouldUnregister={!useEmail} control={control}
                                                    render={({field, fieldState: {error}}) => {
                                                        return <label className={'form-control'}>
                                                            <input
                                                                className={`input w-full input-bordered ${InputErrorClass(error?.message)}`}
                                                                type={'email'}
                                                                placeholder={'输入接收通知邮箱'} {...field}
                                                                {...register("email", {required: useEmail ? '请输入邮箱' : undefined,})} />
                                                            {
                                                                InputErrorLabel(error?.message)
                                                            }
                                                        </label>
                                                    }} name={"email"} rules={{required: useEmail}}/>
                        }

                        <div className="modal-action">
                            <button disabled={disabled} type={'submit'} className={'btn btn-primary'}> {isLoading ?
                                <span className="loading loading-spinner"></span>
                                : <>提交申请</>}
                            </button>
                            <form method="dialog">
                                <button  className="btn" onClick={() => reset()}>取消</button>
                            </form>
                        </div>
                    </form>

                </div>

            </dialog>
        </div>
    );
}
