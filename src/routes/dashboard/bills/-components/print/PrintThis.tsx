import React from "react";
import { BillsPriodFromParams } from "./BillsPriodFromParams";
import { BillsPeriod } from "../api/bills";

type MyProps = {
  title: string;
  ref: React.MutableRefObject<null>;
  period:BillsPeriod
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
      <div className="p-2 flex flex-col w-full h-full">
        <div className="capitaliza text-[15px]  m-1">{this.state.title}</div>
        <BillsPriodFromParams period={this.props.period}/>
      </div>
    );
  }
}
