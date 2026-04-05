import ParagraphGroup from "@/components/layout/paragraphGroup";
import EditableText from "@/components/common/editableText";
import Image from "@/components/common/image";
import useTrombinoscopeItem from "@/hooks/useTrombinoscopeItem";
import { TrombinoscopeElement } from "@/types/db";
import { ArrowDownUp, ChevronLeft, ChevronRight } from "lucide-react";
import ButtonMinus from "@/components/ui/buttonMinus";
import AddImageButton from "../image-editor/addImageButton";

export interface TrombinoscopeItemProps {
	element: TrombinoscopeElement;
	elements: TrombinoscopeElement[];
	setElement: (newElement: TrombinoscopeElement) => void;
	setElements: (newElements: TrombinoscopeElement[]) => void;
}

export default function TrombinoscopeItem(props: TrombinoscopeItemProps) {
	const {
		isAdminDisplay,
		handleIsHovered,
		reorderItem,
		hovered,
		element,
		setElement,
	} = useTrombinoscopeItem(props);

	return (
		<div
			className="w-[10rem] h-[25rem] md:h-full md:flex-1 relative overflow-hidden rounded-md md:rounded-none"
			onMouseEnter={() => handleIsHovered(true)}
			onMouseLeave={() => handleIsHovered(false)}
			onTouchStart={() => handleIsHovered(true)}
			onTouchEnd={() => handleIsHovered(false)}
		>
			{isAdminDisplay && (
				<div className="absolute top-0 absolute top-0 flex w-full p-2 z-5 justify-between items-center">
					<button
						className="cursor-pointer hover:bg-muted rounded-full h-min aspect-square"
						onClick={() => reorderItem(-1)}
					>
						<ChevronLeft />
					</button>
					<ButtonMinus
						onClick={() =>
							props.setElements([
								...props.elements.filter((e) => e.id !== props.element.id),
							])
						}
					/>
					<button
						type="button"
						className="cursor-pointer hover:bg-muted rounded-full h-min aspect-square"
						onClick={() => reorderItem(1)}
					>
						<ChevronRight />
					</button>
				</div>
			)}

			<div
				className={`absolute inset-0 cursor-pointer  z-1 ${hovered ? "opacity-100" : "opacity-0 md:opacity-100"}`}
			>
				<div className="w-full h-[10rem] md:h-full p-[1rem] relative flex flex-col items-center justify-center">
					<div className="absolute top-[50%] md:top-[40%] left-0 w-full aspect-square h-auto flex items-center -translate-y-1/2">
						<div
							className={`relative
                w-full 
                transition-all! duration-300!
                before:content-[''] before:absolute
                before:left-0 before:top-1/2
                before:w-full before:h-[1px]
                before:transition-all! before:duration-300!
                after:content-[''] after:absolute
                after:left-0 after:top-1/2
                after:w-full after:h-[1px]
                after:transition-all! after:duration-300!
                ${hovered && "h-[5rem] before:rotate-45 after:-rotate-45"}  
                `}
							style={{
								// @ts-ignore
								"--before-bg": `${element.color}`,
								"--after-bg": `${element.color}`,
							}}
						></div>
					</div>
				</div>
			</div>
			<div
				className={`absolute inset-0 z-2 flex flex-col justify-start  transition-all! duration-300! px-2 [container-type:inline-size]`}
			>
				<div
					className={`transition-all! duration-300! w-full flex h-[5rem] md:h-[40%] items-end justify-center ${hovered ? "opacity-100 -translate-y-[10cqw] md:-translate-y-[40cqw]" : "opacity-0 md:opacity-100"}`}
				>
					<EditableText
						setContent={(newText) =>
							setElement({
								...element,
								title: { ...element.title, content: newText.content },
							})
						}
						content={{ ...element.title, hyperlinks: [] }}
						as={"h2"}
						className="title md:text-[12cqw]!"
					/>
				</div>
				<div className="w-full flex h-full md:h-[60%] items-center justify-start flex-col mt-5">
					<ParagraphGroup
						content={element.paragraphs}
						onChange={(newParagraphs) =>
							setElement({ ...element, paragraphs: newParagraphs })
						}
						className={`transition-all! duration-300! text-center mb-5 paragraph text-xs! md:text-[8cqw]! ${hovered ? "opacity-100 translate-y-[40cqw]" : "opacity-0"}`}
						classNameForEachParagraph="!bg-transparent"
						as={"p"}
					></ParagraphGroup>
				</div>
				{isAdminDisplay && (
					<div className="h-fit w-full flex justify-center p-2">
						<AddImageButton
							onImage={(newImage) =>
								setElement({ ...element, image: newImage })
							}
						>
							<ArrowDownUp className="hover:stroke-primary" />
						</AddImageButton>
					</div>
				)}
			</div>
			<div
				className={`h-full w-full duration-300! bg-background  ${
					hovered ? "scale-101 blur-sm" : "scale-130"
				}`}
			>
				<Image
					width={160}
					height={600}
					imageProps={element.image}
					onChange={(newImage) => setElement({ ...element, image: newImage })}
				/>
			</div>
		</div>
	);
}
