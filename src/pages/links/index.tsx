import React from "react";
import axios from "axios";
import { Api } from "@/tools/api";
import { ApiResponse } from "@/models/base";
import { FriendLink } from "@/models/friend";
import useRequest from "@ahooksjs/use-request";
import { Card, CardHeader, Divider, Link } from "@nextui-org/react";
import { CardBody } from "@nextui-org/card";
import Loading from "@/components/loading";
import { User } from "@nextui-org/user";
import CardTitle from "@/components/title";

async function fetchData(): Promise<ApiResponse<FriendLink[]>> {
  const response = await axios.get<ApiResponse<FriendLink[]>>(Api.friendApi);
  return response.data;
}

export default function Page() {
  const { data, loading, error } = useRequest<ApiResponse<FriendLink[]>>(() =>
    fetchData()
  );
  const isEmpty = data?.success ? (data.data ?? []).length === 0 : false;
  return (
    <Card>
      <CardHeader>
        <CardTitle title={"友链"} />
      </CardHeader>
      <Divider />
      <CardBody>
        {loading && <Loading />}
        {error && <div>{error.message}</div>}
        {data && (
          <div className={"grid gap-2 md:grid-cols-3 sm: grid-cols-1"}>
            {data.data.map((value) => {
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

            {isEmpty && (
              <span className={"text-default-500 text-sm"}>暂无友链</span>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
