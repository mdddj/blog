import React from "react";
import { FriendLink } from "@/models/friend";
import CardTitle from "@/components/title";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { linkStore } from "@/providers/links";
import { useShallow } from "zustand/react/shallow";
import { showDialogModal } from "@/tools/fun";
import InputErrorLabel, {
  InputErrorClass,
} from "@/components/input_error_label";
import LinkItemLayout from "@/components/link_item_layout";
import TextComponent from "@/components/text";
import { motion } from "framer-motion";

export default function Page() {
  const [useEmail, setUseEmail] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, disabled },
    reset,
  } = useForm<FriendLink>();

  const [list, add] = linkStore(useShallow((state) => [state.data, state.add]));

  const onSubmit: SubmitHandler<FriendLink> = async (values) => {
    setIsLoading(true);
    try {
      await add(values);
      // 关闭模态框
      const dialog = document.getElementById(
        "request-link",
      ) as HTMLDialogElement;
      if (dialog) {
        dialog.close();
      }
      // 重置表单
      reset();
      setUseEmail(false);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">友情链接</h1>
            <p className="text-base-content/70">共 {list.length} 个友链站点</p>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="btn btn-outline"
              onClick={() => showDialogModal("my-info-dialog")}
            >
              我的信息
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
              type="button"
              onClick={() => showDialogModal("request-link")}
            >
              申请友链
            </motion.button>
          </div>
        </div>

        {list.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {list.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <LinkItemLayout link={value} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔗</div>
            <h3 className="text-xl font-semibold mb-2">暂无友链</h3>
            <p className="text-base-content/70 mb-6">还没有添加任何友情链接</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
              onClick={() => showDialogModal("request-link")}
            >
              申请友链
            </motion.button>
          </div>
        )}

        <dialog id={"my-info-dialog"} className={"modal"}>
          <div className={"modal-box max-w-2xl"}>
            <h3 className={"font-bold text-lg mb-5"}>我的信息</h3>
            <TextComponent isShadow={false} textKey={"my-info"} />
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">关闭</button>
              </form>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button type={"submit"}>close</button>
          </form>
        </dialog>

        {/*申请弹窗*/}
        <dialog className={"modal"} id={"request-link"}>
          <div className={"modal-box max-w-2xl"}>
            <h3 className="font-bold text-lg mb-5">申请友链</h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={"flex flex-col justify-center gap-4"}
            >
              <Controller
                control={control}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <label className={"form-control"}>
                      <div className="label">
                        <span className="label-text">站点名称 *</span>
                      </div>
                      <input
                        {...field}
                        className={`input w-full input-bordered ${InputErrorClass(error?.message)}`}
                        placeholder={"请输入站点名称"}
                        {...register("name", { required: "请输入站点名称" })}
                      />
                      {InputErrorLabel(error?.message)}
                    </label>
                  );
                }}
                name={"name"}
              />
              <Controller
                control={control}
                render={({ field }) => {
                  const errorMsg = errors.url?.message;
                  return (
                    <label className={"form-control"}>
                      <div className="label">
                        <span className="label-text">站点URL *</span>
                      </div>
                      <input
                        className={`input w-full input-bordered ${InputErrorClass(errorMsg)}`}
                        {...field}
                        type={"url"}
                        placeholder={"https://example.com"}
                        {...register("url", { required: "请输入URL" })}
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
                render={({ field, fieldState: { error } }) => {
                  return (
                    <label className={"form-control"}>
                      <div className="label">
                        <span className="label-text">站点LOGO *</span>
                      </div>
                      <input
                        className={`input w-full input-bordered ${InputErrorClass(error?.message)}`}
                        {...field}
                        placeholder={"https://example.com/logo.png"}
                        {...register("logo", { required: "请输入logo" })}
                      />
                      {InputErrorLabel(error?.message)}
                    </label>
                  );
                }}
                name={"logo"}
                rules={{
                  required: "请输入站点logo",
                }}
              />

              <label className={"form-control"}>
                <div className="label">
                  <span className="label-text">站点介绍</span>
                </div>
                <textarea
                  className={"textarea w-full textarea-bordered"}
                  placeholder={"(可选)输入网站介绍"}
                  {...register("intro")}
                />
              </label>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-4">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={useEmail}
                    onChange={(e) => setUseEmail(e.target.checked)}
                  />
                  <span className="label-text">接收审核通过通知</span>
                </label>
              </div>

              {useEmail && (
                <Controller
                  shouldUnregister={!useEmail}
                  control={control}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <label className={"form-control"}>
                        <div className="label">
                          <span className="label-text">通知邮箱 *</span>
                        </div>
                        <input
                          className={`input w-full input-bordered ${InputErrorClass(error?.message)}`}
                          type={"email"}
                          placeholder={"输入接收通知邮箱"}
                          {...field}
                          {...register("email", {
                            required: useEmail ? "请输入邮箱" : undefined,
                          })}
                        />
                        {InputErrorLabel(error?.message)}
                      </label>
                    );
                  }}
                  name={"email"}
                  rules={{ required: useEmail }}
                />
              )}

              <div className="modal-action">
                <form method="dialog">
                  <button className="btn mr-2">取消</button>
                </form>
                <button
                  disabled={disabled || isLoading}
                  type={"submit"}
                  className={"btn btn-primary"}
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      提交中...
                    </>
                  ) : (
                    "提交申请"
                  )}
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </motion.div>
    </div>
  );
}
