

const Shimmer = () =>{

    return(
      <div className="shimmer-container" data-testid = "shimmer-container">
        {Array(20).fill("").map((_,index) =>(
            <div key = {index} className="shimmer-card" data-testid = "shimmer-card">
            </div>
        ))}
      </div>
    )
}

export default Shimmer;