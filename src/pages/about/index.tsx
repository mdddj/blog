import React from "react";
import { Card, CardHeader, Divider } from "@nextui-org/react";
import CardTitle from "@/components/title";
import { CardBody } from "@nextui-org/card";
import TextComponent from "@/components/text";

export default function Page() {
  document.title = "关于";
  return (
    <Card>
      <CardHeader>
        <CardTitle title={"关于"} />
      </CardHeader>
      <Divider />
      <CardBody>
        <TextComponent textKey={"about"} />
      </CardBody>
    </Card>
  );
}
