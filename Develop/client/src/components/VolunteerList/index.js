//WHEN USING USESTATE OR OTHER HOOKS TO SET DEFAULT VALUES FOR THE ARRAY- MODIFY THE IMPORT STATEMENT 

//IMPORT MODAL OR THE CODE WILL BREAK-MAKE A MODAL COMPONENT AND ADD IT TO ALL REQ FILES


//COMPONENTLIST CHILD COMPONENT TO PARENT COMPONENT= USING OBJECTS WITH TITLES AND DESCRIPTIONS TO USE IN THE MODAL
const VolunteerList = ({ category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState();
  const [photos] = useState([
    {
      name: 'Eco Non Profit X',
      category: 'carbon',
      description:
        'Eco Non Profit X seeks volunteers for beach clean-up!'
    },
    {
      name: 'Eco Non Profit Y',
      category: 'bees',
      description:
        'Eco Non Profit Y seeks beekeeping volunteers'
    },

  ]);

  const currentPhotos = photos
    .filter(photo => photo.category === category)

  const toggleModal = (image, i) => {
    setCurrentPhoto({ ...image, index: i });
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      {isModalOpen && (
        <Modal onClose={toggleModal} currentPhoto={currentPhoto} />
      )}
      <div className="flex-row">
        {currentPhotos.map((image, i) => (
          <img
            src={require(`../../assets/images/${category}/${i}.jpg`)}
            alt={image.name}
            className="img-thumbnail mx-1"
            onClick={() => toggleModal(image, i)}
            key={image.name}
          />
        ))}
      </div>
    </div>
  );
};

export default VolunteerList;
