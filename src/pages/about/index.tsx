import React from 'react';
import {Card, CardHeader, Divider} from "@nextui-org/react";
import CardTitle from "@/components/title";
import {CardBody} from "@nextui-org/card";

export default function Page() {
  return (
      <Card>
          <CardHeader>
              <CardTitle title={'关于'}/>
          </CardHeader>
          <Divider/>
          <CardBody>
              <div className={'flex flex-wrap gap-5'}>
                  暂无内容
              </div>
          </CardBody>
      </Card>
  );
}
