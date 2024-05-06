import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { PropsWithChildren } from "react";

type Prop = {
  title: string;
};

const MyMenuItem: React.FC<PropsWithChildren<Prop>> = (props) => {
  return (
    <Card shadow={"none"}>
      <CardHeader>
        <div>{props.title}</div>
      </CardHeader>
      <CardBody>{props.children}</CardBody>
    </Card>
  );
};
export default MyMenuItem;
