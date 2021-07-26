import { MemoryRouter as Router, Route, Switch } from 'react-router-dom'

const dirViewer =({object})=> {




    return (
        <div className="dirViewerDiv">
            {object.map((data => {


                return (
                    <div>
                        {data.type == 'directory'? {
                            
                        } : null}
                    </div>
                )
            }))}
        </div>
    )
}

export default dirViewer;