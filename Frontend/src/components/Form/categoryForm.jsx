

export default function CategoryForm({handleSubmit,value,setValue}){
    return(
        <form onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="name">Create Category</label>
            <input
                id="name"
                className="form-control"
                type="text"
                value={value}
                onChange={(e)=> setValue(e.target.value)}
            />
            <button className="btn btn-primary mt-2">submit</button>
        </form>
    )
}