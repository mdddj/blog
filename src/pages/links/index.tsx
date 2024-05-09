import React from "react";
import { FriendLink } from "@/models/friend";
import CardTitle from "@/components/title";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { linkStore } from "@/providers/links";
import { useShallow } from "zustand/react/shallow";

export default function Page() {
  document.title = "友链";
  const [useEmail, setUseEmail] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
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
      <div>
        <div className={"justify-between"}>
          <CardTitle title={"友链"} />
          {/*<button*/}
          {/*  color={"primary"}*/}
          {/*>*/}
          {/*  申请友链*/}
          {/*</button>*/}
        </div>
        <div />
        <div>
          <div
            className={
              "grid gap-2 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2"
            }
          >
            {list.map((value) => {
              return (
                <div key={value.id}>
                  <div>
                    <a href={value.url}>
                        {value.intro}
                      </a>
                  </div>
                </div>
              );
            })}

            {list.length === 0 && (
                <span className={"text-default-500 text-sm"}>暂无友链</span>
            )}
          </div>
        </div>
      </div>

      {/*<div >*/}
      {/*  <form onSubmit={handleSubmit(onSubmit)}>*/}
      {/*    <div>*/}
      {/*      <div>填写网站资料</div>*/}

      {/*      <div>*/}
      {/*        <input*/}
      {/*          // label={"站点名称"}*/}
      {/*          autoFocus={true}*/}
      {/*          // variant={"bordered"}*/}
      {/*          placeholder={"请输入站点名称"}*/}
      {/*          {...register("name", { required: "请输入站点名称" })}*/}
      {/*          // errorMessage={errors.name?.message}*/}
      {/*        />*/}
      {/*        <Controller*/}
      {/*          control={control}*/}
      {/*          render={({ field }) => {*/}
      {/*            return (*/}
      {/*              <input*/}
      {/*                // label={"访问URL"}*/}
      {/*                {...field}*/}
      {/*                type={"url"}*/}
      {/*                // variant={"bordered"}*/}
      {/*                placeholder={"请输入URL"}*/}
      {/*                {...register("url", { required: "请输入URL" })}*/}
      {/*                // errorMessage={errors.url?.message}*/}
      {/*              />*/}
      {/*            );*/}
      {/*          }}*/}
      {/*          name={"url"}*/}
      {/*          rules={{*/}
      {/*            required: "请输入访问URL",*/}
      {/*            pattern: {*/}
      {/*              value: /^(ftp|http|https):\/\/[^ "]+$/,*/}
      {/*              message: "请输入有效的URL",*/}
      {/*            },*/}
      {/*          }}*/}
      {/*        />*/}

      {/*        <Controller*/}
      {/*          control={control}*/}
      {/*          render={({ field }) => {*/}
      {/*            return (*/}
      {/*              <input*/}
      {/*                // label={"LOGO"}*/}
      {/*                {...field}*/}
      {/*                // variant={"bordered"}*/}
      {/*                placeholder={"请输入LOGO直链"}*/}
      {/*                {...register("logo", { required: "请输入logo" })}*/}
      {/*                // errorMessage={errors.logo?.message}*/}
      {/*              />*/}
      {/*            );*/}
      {/*          }}*/}
      {/*          name={"logo"}*/}
      {/*          rules={{*/}
      {/*            required: "请输入站点logo",*/}
      {/*            pattern: {*/}
      {/*              value: /^(http|https):\/\/.*\.(jpeg|jpg|gif|png|bmp)$/i,*/}
      {/*              message: "请输入有效的图片地址",*/}
      {/*            },*/}
      {/*          }}*/}
      {/*        />*/}
      {/*        <input*/}
      {/*          // label={"一句话介绍"}*/}
      {/*          // variant={"bordered"}*/}
      {/*          placeholder={"请输入网站介绍"}*/}
      {/*          {...register("intro", { required: "请输入介绍" })}*/}
      {/*          // errorMessage={errors.intro?.message}*/}
      {/*        />*/}
      {/*        <div className={"flex justify-between items-center py-2 px-1"}>*/}
      {/*          <input*/}
      {/*            className={"flex-shrink-0 mr-2"}*/}
      {/*            // isSelected={useEmail}*/}
      {/*            // onValueChange={(isSelected) => setUseEmail(isSelected)}*/}
      {/*            // classNames={{ label: "text-small" }}*/}
      {/*          >*/}
      {/*            接收邮件通知*/}
      {/*          </input>*/}
      {/*          <div>*/}
      {/*            <Controller*/}
      {/*              render={({ field }) => {*/}
      {/*                return (*/}
      {/*                  <input*/}
      {/*                    {...register("email")}*/}
      {/*                    placeholder={"输入联系邮箱"}*/}
      {/*                    // variant={"bordered"}*/}
      {/*                    // size={"sm"}*/}
      {/*                    {...field}*/}
      {/*                  />*/}
      {/*                );*/}
      {/*              }}*/}
      {/*              control={control}*/}
      {/*              name={"email"}*/}
      {/*            />*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}

      {/*      <div>*/}
      {/*        <button color="danger" >*/}
      {/*          取消*/}
      {/*        </button>*/}
      {/*        <button  color={"primary"} type={"submit"}>*/}
      {/*          提交申请*/}
      {/*        </button>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </form>*/}
      {/*</div>*/}
    </div>
  );
}
