function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search records...`}
        />
    )
}

export default DefaultColumnFilter;