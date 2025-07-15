import { useGetAttractionDestination } from "@/app/hooks/activities/useGetAttractionDestination";
import { useDebounce } from "@/app/hooks/utils/useDebounce";
import { generalValidationRules } from "@/app/lib/validations";
import { Select, Form, Spin } from "antd";
import { useState } from "react";

export const FormAttractionDestinationInput: React.FC<{
  Form: typeof Form;
  control?: { label: string; name: string | (string | number)[] };
  showLabel?: boolean;
}> = ({ Form, control, showLabel = true }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isFetching } = useGetAttractionDestination(
    {
      query: debouncedSearchTerm,
    },
    debouncedSearchTerm.length > 0
  );

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      name={control?.name ?? "locationId"}
      label={showLabel ? control?.label ?? "Attraction Location" : null}
      rules={generalValidationRules}
    >
      <Select
        placeholder="Location"
        loading={isFetching}
        showSearch
        allowClear
        onClear={() => setSearchTerm("")}
        onSearch={handleSearch}
        className="rounded border-slate-400 w-full"
        defaultActiveFirstOption={false}
        filterOption={false}
        notFoundContent={
          isFetching ? <Spin size="small" /> : "No location found"
        }
    
      >
        {data?.data.map((item) => (
          <Select.Option value={item.id} key={item.id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
