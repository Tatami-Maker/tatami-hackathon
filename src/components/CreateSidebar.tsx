import { FC } from "react";
import StepUI from "components/StepUI";
import {presetList} from "../views/create/index";

type Props = {
  level: number;
  type: number;
}

export const CreateSidebar: FC<Props> = ({level, type}: Props) => {
    return (
        <div className="create-side md:w-1/4 flex flex-col items-end">
            <div className="w-full md:w-4/5 bg-[#080524] h-full">
              <div className="ml-4">
                <h5 className="text-[#9393A9] text-sm">PRESET SELECTED</h5>
                <select name="presets" className="bg-[#040216] text-sm py-2 px-4 w-11/12 lg:w-48
                border-2 border-[#2C2C5A] rounded-lg my-2">
                  <option value="High Degen">{presetList[type-1]}</option>
                </select>
                <div className="step mt-6">
                  <StepUI count={1} title="Token Details" level={level} />
                  <StepUI count={2} title="Review" level={level} />
                  <StepUI count={3} title="Launch" level={level} />
                </div>
              </div>
             
            </div>
        </div>
    )
}