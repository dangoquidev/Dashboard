import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import styles from "./Card.module.css";

type CardWidgetProps = {
    size: "small" | "medium" | "large";
}

export const CardWidget = ({ size }: CardWidgetProps) => {
    return (
        <Card className={`py-4 ${styles[size]}`}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">NAGISA BEST WAIFU</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
            <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://images8.alphacoders.com/130/1309883.jpg"
            width={270}
            />
        </CardBody>
        </Card>
    );
}