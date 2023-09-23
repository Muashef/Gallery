import React, { useState, useCallback } from 'react';
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { gallery } from '../../public/data';

const Image = ({ title, tags, img, id, index }) => (
<Draggable draggableId={`image-${id}`} index={index}>
{(provided) => (
  <div className="p-4 bg-white shadow rounded-lg mb-4"
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
  >
    <img className="object-cover w-full block" src={img} alt="" />
    <h2 className="text-2xl font-bold mt-2">{title}</h2>
    <p className="block text-[#353A43] text-lg mt-4">{tags.join(', ')}</p>
  </div>
   )}
</Draggable>
);

const GalleryImage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredImages, setFilteredImages] = useState(gallery)

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const filteredImagesToRender = gallery.filter((image) => {
    // Case-insensitive search for tags
    return image.tags.some((tag) =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

//   const onDragEnd = (result) => {
//     // Check if the drag was successful
//     if (!result.destination) {
//       return;
//     }

//     const startIndex = result.source.index;
//     const endIndex = result.destination.index;

//     const updatedImages = Array.from(filteredImages);
//   const [reorderedImage] = updatedImages.splice(startIndex, 1);
//   updatedImages.splice(endIndex, 0, reorderedImage);

//   // Update the state with the new order of images
//   setFilteredImages(updatedImages);
//   };

const handleDragEnd = (result) => {
    if (!result.destination) return; // Return if dropped outside the droppable area

    const { source, destination } = result;
    const updatedImages = Array.from(filteredImages);
    const [draggedImage] = updatedImages.splice(source.index, 1);
    updatedImages.splice(destination.index, 0, draggedImage);

    setFilteredImages(updatedImages);
  };


  return (
    <div>
        <div className='flex items-center justify-between py-8 px-8'>
            <h2 className='text-5xl font-extrabold'>Gallery</h2>
            <div className="w-[60%] ">
        <form className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-white border border-[#C6C9CF] text-black text-sm rounded-md block w-full pl-10 p-2.5 outline-none"
              placeholder="Search by tags"
              value={searchTerm}
              onChange={handleSearchChange}
              required
            />
          </div>
        </form>
            </div>
        </div>
      
        <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="gallery">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 cursor-grab"
            >
              {filteredImagesToRender.map((image, index) => (
                <Image
                key={image.id} 
                  index={index}
                  id={image.id}
                  title={image.title}
                  img={image.img}
                  tags={image.tags}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default GalleryImage;