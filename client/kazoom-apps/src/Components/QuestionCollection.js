import React from 'react';
import {Button} from 'reactstrap';
import { DELETE_COLLECTION, FETCH_COLLECTIONS } from '../config/queries';
import { useMutation } from '@apollo/client';
import { questionsData } from '../config/makeVar';

const Collection = ({data, addCollection}) => {
    const [deleteTemplate] = useMutation(DELETE_COLLECTION, {
        refetchQueries: [{
            query: FETCH_COLLECTIONS
        }]
    })
    const handleDelete = (id) => {
        deleteTemplate({
            variables: {
                inputId: id
            }
        })
    }

    const handleUse = () => {
        console.log(data.questions, `ini datanya`)
        return addCollection(data.questions)
    }

    return (
        <div>
            <span className="d-inline-block text-truncate" style={{marginRight: '20px', width: '180px'}}>{data.title}</span>
            <span>Total Question: {data.questions.length}</span><br/>
            <div className="mt-2">
                <Button onClick={() => handleUse()} size="sm" color="info" className="mr-2">Choose</Button>
                <Button onClick={() => handleDelete(data._id)} size="sm" color="danger">Delete</Button>
            </div>
        </div>
    )
}

export default Collection