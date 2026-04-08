'use client';

import { useState, useEffect } from 'react';

const FormField = (props) => {
    const { label, type = 'text', name, value, onChange, options = [], placeholder, required = false } = props.blok;
    const [fetchedOptions, setFetchedOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

            const datasource = 'valori-drop';
    useEffect(() => {
        if (type === 'select') {
            const fetchDatasource = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const token = process.env.NEXT_PUBLIC_STORYBLOK_DELIVERY_API_TOKEN || 'LxizLeXSu8CYbpIjfV7KrQtt';
                    const response = await fetch(
                        `https://api.storyblok.com/v2/cdn/datasource_entries?datasource=${datasource}&token=${token}`
                    );
                    
                    if (!response.ok) {
                        throw new Error(`Failed to fetch datasource: ${response.statusText}`);
                    }
                    
                    const data = await response.json();
                    // Transform the datasource entries to match the expected format
                    const transformedOptions = data.datasource_entries.map(entry => ({
                        value: entry.value,
                        label: entry.name
                    }));
                    setFetchedOptions(transformedOptions);
                } catch (err) {
                    console.error('Error fetching datasource:', err);
                    setError(err.message);
                    setFetchedOptions([]);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchDatasource();
        }
    }, [type]);

    // Use fetched options for select type if datasource is provided, otherwise use props.options
    const selectOptions = datasource ? fetchedOptions : options;

    if (type === 'select') {
        if (isLoading) {
            return (
                <div className="form-field">
                    <label className="form-field__label" htmlFor={name}>
                        {label}
                    </label>
                    <div className="form-field__loading">Loading options...</div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="form-field">
                    <label className="form-field__label" htmlFor={name}>
                        {label}
                    </label>
                    <div className="form-field__error">Error loading options: {error}</div>
                </div>
            );
        }
        return (
            <div className="form-field">
                <label className="form-field__label" htmlFor={name}>
                    {label}
                </label>
                <select
                    className="form-field__select"
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                >
                    <option value="">Select an option</option>
                    {selectOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    return (
        <div className="form-field">
            <label className="form-field__label" htmlFor={name}>
                {label}
            </label>
            <input
                className="form-field__input"
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};

export default FormField;