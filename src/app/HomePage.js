import React from 'react';

import AnimalMovingDiv from '../Component/AnimalMovingDiv';

function HomePage({animalIndex, isMobile}) {

    return (
        !isMobile ? 
        (
            <AnimalMovingDiv 
                animalIndex={animalIndex}
            >
                <p>This is home page</p>
            </AnimalMovingDiv>
        ):
        (
            <div>
                <h1>this is home page</h1>
            </div>
        )
    );
}

export default HomePage;