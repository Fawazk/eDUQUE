import React from 'react';
import List_questions from '../Components/List_questions/List_questions';
import Adminpanel from '../Components/Adminpanel/Adminpanel';



export default function List_questionspage(){
    return(
        <div>
            <Adminpanel>
                <List_questions/>
            </Adminpanel>
        </div>
    );
}