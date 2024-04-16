import React from "react";
import { FriendLink } from "@/models/friend";
import {
  Button,
  Card,
  CardHeader,
  Divider,
  Link,
  Modal,
  useDisclosure,
} from "@nextui-org/react";
import { CardBody } from "@nextui-org/card";
import { User } from "@nextui-org/user";
import CardTitle from "@/components/title";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Checkbox } from "@nextui-org/checkbox";
import { showDefaultMessage } from "@/components/alert_modal";
import { linkStore } from "@/providers/links";
import { useShallow } from "zustand/react/shallow";

export default function Page() {
  document.title = "友链";
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
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
      onClose();
      setTimeout(() => showDefaultMessage("提交成功."), 300);
    } catch (e) {
      showDefaultMessage(`${e}`);
    }
    setIsLoading(false);
  };
  return (
    <div>
      <Card>
        <CardHeader className={"justify-between"}>
          <CardTitle title={"友链"} />
          <Button
            color={"primary"}
            size={"sm"}
            radius={"full"}
            onClick={onOpen}
          >
            申请友链
          </Button>
        </CardHeader>
        <Divider />
        <CardBody>
          <div
            className={
              "grid gap-2 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2"
            }
          >
            {list.map((value) => {
              return (
                <div key={value.id}>
                  <User
                    name={value.name}
                    avatarProps={{
                      src: value.logo,
                    }}
                    description={
                      <Link href={value.url} isExternal={true} size={"sm"}>
                        {value.intro}
                      </Link>
                    }
                  />
                </div>
              );
            })}

            {list.length === 0 && (
              <span className={"text-default-500 text-sm"}>暂无友链</span>
            )}
          </div>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>填写网站资料</ModalHeader>

            <ModalBody>
              <Input
                label={"站点名称"}
                autoFocus={true}
                variant={"bordered"}
                placeholder={"请输入站点名称"}
                {...register("name", { required: "请输入站点名称" })}
                errorMessage={errors.name?.message}
              />
              <Controller
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      label={"访问URL"}
                      {...field}
                      type={"url"}
                      variant={"bordered"}
                      placeholder={"请输入URL"}
                      {...register("url", { required: "请输入URL" })}
                      errorMessage={errors.url?.message}
                    />
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
                render={({ field }) => {
                  return (
                    <Input
                      label={"LOGO"}
                      {...field}
                      variant={"bordered"}
                      placeholder={"请输入LOGO直链"}
                      {...register("logo", { required: "请输入logo" })}
                      errorMessage={errors.logo?.message}
                    />
                  );
                }}
                name={"logo"}
                rules={{
                  required: "请输入站点logo",
                  pattern: {
                    value: /^(http|https):\/\/.*\.(jpeg|jpg|gif|png|bmp)$/i,
                    message: "请输入有效的图片地址",
                  },
                }}
              />
              <Input
                label={"一句话介绍"}
                variant={"bordered"}
                placeholder={"请输入网站介绍"}
                {...register("intro", { required: "请输入介绍" })}
                errorMessage={errors.intro?.message}
              />
              <div className={"flex justify-between items-center py-2 px-1"}>
                <Checkbox
                  className={"flex-shrink-0 mr-2"}
                  isSelected={useEmail}
                  onValueChange={(isSelected) => setUseEmail(isSelected)}
                  classNames={{ label: "text-small" }}
                >
                  接收邮件通知
                </Checkbox>
                <div>
                  <Controller
                    render={({ field }) => {
                      return (
                        <Input
                          {...register("email")}
                          placeholder={"输入联系邮箱"}
                          variant={"bordered"}
                          size={"sm"}
                          {...field}
                        />
                      );
                    }}
                    control={control}
                    name={"email"}
                  />
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                取消
              </Button>
              <Button isLoading={isLoading} color={"primary"} type={"submit"}>
                提交申请
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
}
