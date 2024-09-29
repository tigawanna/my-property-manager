import React from "react";
import { BillsPriodFromParams } from "./BillsPriodFromParams";
import { BillsPeriod } from "../api/bills";

type MyProps = {
  title: string;
  ref: React.MutableRefObject<null>;
  period: BillsPeriod;
};
type MyState = {
  title: string;
};

export class PrintThis extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: this.props.title,
    };
  }

  render() {
    return (
      <div className="flex h-full w-full flex-col p-2">
        <BillsPriodFromParams period={this.props.period} />
      </div>
    );
  }
}
