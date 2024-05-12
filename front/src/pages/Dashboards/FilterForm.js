import React from 'react';

const FilterForm = ({ onDeveloperChange, onDateChange }) => {
    return (
        <form className="filter-form">
            <select onChange={onDeveloperChange}>
                {/* Options should be dynamically generated */}
                <option value="john">John D.</option>
                <option value="ryan">Ryan U.</option>
            </select>
            <input type="date" onChange={onDateChange} />
            <button type="submit">Select Developer</button>
        </form>
    );
};

export default FilterForm;
