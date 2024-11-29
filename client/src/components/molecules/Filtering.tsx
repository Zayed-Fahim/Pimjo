import React from "react";
import Popover from "./Popover";
import { Button, Loader } from "../atoms";
import { Filter } from "@/constant";
import { InputFormField, SelectFormField } from "@/components/molecules";
import { useForm } from "react-hook-form";

interface FilteringProps {
  onFilterChange: (filter: {
    status?: string;
    dueDate?: string;
    priority?: string;
  }) => void;
  isLoading: boolean;
}

const Filtering = ({ onFilterChange, isLoading }: FilteringProps) => {
  const { handleSubmit, reset, register } = useForm({
    defaultValues: { status: "", dueDate: "", priority: "" },
  });

  const handleFilter = (filter: {
    status?: string;
    dueDate?: string;
    priority?: string;
  }) => {
    onFilterChange(filter);
  };

  const onSubmit = (data: {
    status: string;
    dueDate: string;
    priority?: string;
  }) => {
    handleFilter({
      status: data.status,
      dueDate: data.dueDate,
      priority: data?.priority,
    });
  };

  return (
    <Popover
      trigger={
        <Button className="hover:bg-zinc-800 rounded p-2 flex items-center justify-center gap-x-2">
          <h1 className="text-sm font-semibold">Filter</h1>
          <Filter className="w-6 h-6" />
        </Button>
      }
      className="right-0 top-10 border border-zinc-800 w-[160px] shadow-xl rounded-sm"
    >
      <Popover
        trigger={
          <Button className="w-full px-4 py-2 border-b border-zinc-800 hover:bg-zinc-900 text-nowrap text-left">
            Add Filter
          </Button>
        }
        className="right-[100%] top-10 border border-zinc-800 w-[230px] shadow-xl rounded-sm"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 flex flex-col gap-5"
        >
          <SelectFormField
            htmlFor="status"
            text="Status"
            register={register}
            name="status"
            options={[
              { label: "Pending", value: "Pending" },
              { label: "Completed", value: "Completed" },
              { label: "In Progress", value: "In Progress" },
            ]}
            id="status"
          />
          <SelectFormField
            htmlFor="priority"
            text="Priority"
            register={register}
            name="priority"
            options={[
              { label: "High", value: "High" },
              { label: "Medium", value: "Medium" },
              { label: "Low", value: "Low" },
            ]}
            id="priority"
          />
          <InputFormField
            htmlFor="dueDate"
            text="Due Date"
            type="date"
            id="dueDate"
            name="dueDate"
            register={register}
          />
          <Button
            type="submit"
            className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
          >
            <div className="flex justify-center items-center gap-x-5">
              <p>Submit</p>
              {isLoading && <Loader className="border-black" />}
            </div>
          </Button>
        </form>
      </Popover>

      <Button
        onClick={() => {
          handleFilter({ status: "", dueDate: "" });
          reset();
        }}
        className="w-full px-4 py-2 hover:bg-zinc-900 text-nowrap text-left"
      >
        Clear Filters
      </Button>
    </Popover>
  );
};

export default Filtering;
