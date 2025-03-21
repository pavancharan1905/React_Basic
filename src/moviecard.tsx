interface PropsManager{
    title:string,
    id:number
}


function Moviecard(pr:PropsManager){
    return(
        <div>
            <h1>{pr.title}</h1>
            <h1>{pr.id}</h1>
        </div>
    )


}


export default Moviecard