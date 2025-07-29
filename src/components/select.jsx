const Select = ({ value, onChange, className, options, children, ...props }) => {
    return (
        <select
            value={value}
            onChange={onChange}
            className={`rounded-[4px] border border-gray-200 p-1 text-sm text-gray-500 active:border-gray-200 ${className}`}
            {...props}
        >
            {children
                ? children
                : options?.map?.((option) => {
                      const { displayValue, ...optionProps } = option;
                      return (
                          <option key={optionProps?.value} {...optionProps}>
                              {displayValue}
                          </option>
                      );
                  })}
        </select>
    );
};

export default Select;
