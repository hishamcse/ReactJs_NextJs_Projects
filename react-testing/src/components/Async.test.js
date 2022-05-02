import {render, screen} from "@testing-library/react";
import Async from "./Async";

describe('Async Component', () => {

    test('renders list', async () => {
        window.fetch = jest.fn()
        window.fetch.mockResolvedValueOnce({
            json: async () => [{id: 1, title: 'first'}]
        })
        render(<Async />)

        const el = await screen.findAllByRole('listitem');
        expect(el).not.toHaveLength(0);
    })

})