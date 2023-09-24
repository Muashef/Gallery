import React, { useState, useCallback } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { gallery } from '../data';

const GalleryImage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedImage, setDraggedImage] = useState(null);
  const [updatedGallery, setUpdatedGallery] = useState(gallery);

  const handleDragStart = (image) => {
    setDraggedImage(image);
  };

  const handleDragEnd = (result) => {
    setDraggedImage(null);
    if (!result.destination) return; // Dropped outside a valid Droppable area

    const updatedImages = Array.from(updatedGallery);
    const [reorderedImage] = updatedImages.splice(result.source.index, 1);
    updatedImages.splice(result.destination.index, 0, reorderedImage);

    setUpdatedGallery(updatedImages);
  };


  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

//   const handleDragStart = (image) => {
//     setDraggedImage(image);
//   };

//   const handleDragEnd = () => {
//     setDraggedImage(null);
//   };

  const filteredImages = gallery.filter((image) => {
    return image.tags.some((tag) =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const imagesToDisplay = searchTerm ? filteredImages : updatedGallery;

  return (
    <div>
      <div className='flex items-center justify-between py-8 px-8'>
        <h2 className='text-5xl font-extrabold'>Gallery</h2>
        <div className="w-[60%]">
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
        <Droppable droppableId="gallery" direction="vertical">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 cursor-grab"
            >
              {imagesToDisplay.map((item, index) => (
                <Draggable key={item.id.toString()} draggableId={item.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onMouseDown={() => handleDragStart(item)}
                      className="p-4 border border-gray-300 rounded"
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-48 object-cover mb-2"
                      />
                      <h3 className="text-lg font-semibold mb-2">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="mr-2 mb-2 px-2 py-1 bg-gray-200 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </Draggable>
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