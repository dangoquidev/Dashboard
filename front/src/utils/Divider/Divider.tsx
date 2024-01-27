import { ReactNode } from "react";
import "./Divider.css";

interface DividerProps {
	children?: ReactNode;
}

const Divider = ({ children }: DividerProps) => {
	return (
		<div className='container'>
			<div className='border' />
			<span className='content'>{children}</span>
			<div className='border' />
		</div>
	);
};

export default Divider;
