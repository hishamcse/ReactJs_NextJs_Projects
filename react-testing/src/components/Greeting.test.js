import {render, screen} from "@testing-library/react";
import Greeting from "./Greeting";
import userEvent from "@testing-library/user-event";

describe('Greeting test', () => {

    test('check hello world', () => {
        // arrange
        render(<Greeting/>);

        // act
        // .... nothing

        // assert
        const textHtml = screen.getByText('Hello World', {exact: false});
        expect(textHtml).toBeInTheDocument();
    })

    test('no change test', () => {
        // arrange
        render(<Greeting/>);

        // act
        // .... nothing

        // assert
        const textHtml = screen.getByText('Hey you no change');
        expect(textHtml).toBeInTheDocument();
    })

    test('change test', () => {
        // arrange
        render(<Greeting/>);

        // act
        const btn = screen.getByRole('button');
        userEvent.click(btn);

        // assert
        const textHtml = screen.getByText('changed', {exact: false});
        expect(textHtml).toBeInTheDocument();
    })

    test('no click and no change test', () => {
        // arrange
        render(<Greeting/>);

        // act
        const btn = screen.getByRole('button');
        userEvent.click(btn);

        // assert
        const textHtml = screen.queryByText('Hey you no change');
        // expect(textHtml).not.toBeInTheDocument();
        expect(textHtml).toBeNull()
    })
})