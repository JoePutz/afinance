import {render, screen} from '@testing-library/react';
import TextInput from '../components/TextInput';

describe('Text Input component should', ()=>{
    it('render with all correct props', () =>{
        const onChange = () => {}

        render(<TextInput id='test' label='myLabelTest' type='text' value='' onChange={onChange} /> )

        expect(screen.getByLabelText('myLabelTest')).toBeInTheDocument();
    })
})
