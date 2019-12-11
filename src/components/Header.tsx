import React from 'react';

interface IProps {}

interface IState {
    counter: number
}

class Header extends React.Component<IProps, IState> {

    render(){
        return <div>Header</div>
    }
}

export default Header;