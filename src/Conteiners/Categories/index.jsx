import React from 'react';
import {getCategory, addNewCategory, deleteCategory} from '../../Store/Actions/categoryAction';
import {connect} from 'react-redux';
import style from './style.styl';
import Input from '../../Components/input';
import Button from '../../Components/button';
import Modal from '../../Components/modal';
import ModalDelete from '../../Components/modalDelete';
import ModalEditCategory from '../../Components/modalEditCategory';

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newCategoryName: null,
            newSubCategoryName: null,
            showModal: false,
            categoryId: null,
            showDeletModal: false
        }
    }

    onChangeNewCategoryName = (e) => {
        this.setState({
            newCategoryName: e.target.value
        });
    }

    onChangeSubCategoryName = (e) => {
        this.setState({
            newSubCategoryName: e.target.value
        });
    }

    componentDidMount () {
        this.props.getCategory();
    }

    showModal = (e) => {
        this.setState({
            showModal: true,
            categoryId: e.target.id
        })
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    showDeleteModal = (e) => {
        console.log(e.target.id);
        this.setState({
            showDeleteModal: true,
            categoryId: e.target.id
        })
    }

    closeDeleteModal = () => {
        this.setState({
            showDeleteModal: false
        })
    }

    addNewCategory = () => {
        const newCategory = JSON.stringify({
            name: this.state.newCategoryName
        })
        this.props.addNewCategory(newCategory);
        this.setState({
            newCategoryName: ''
        });
    }

    addNewSubCategory = () => {
        const newCategory = JSON.stringify({
            name: this.state.newSubCategoryName,
            parentId: Number(this.state.categoryId)
        })
        this.props.addNewCategory(newCategory);
        this.closeModal();
    }

    deleteCategory = (id) => {
        this.props.deleteCategory(id);
        this.closeDeleteModal();
    }

    renderCategory = (array) => {
        let roots = [],
            children = {};
      
        for (let i = 0; i < array.length; ++i) {
          var item = array[i],
            p = item.parentId,
            target = !p ? roots : (children[p] || (children[p] = []));
      
          target.push({
            value: item
          });
        }

        let findChildren = (parent) => {
          if (children[parent.value.id]) {
            parent.children = children[parent.value.id];
            for (let i = 0; i < parent.children.length; ++i) {
              findChildren(parent.children[i]);
            }
          }
        };

        for (let i = 0; i < roots.length; ++i) {
          findChildren(roots[i]);
        }
        return this.renderCategoryItem(roots);
      }

    renderCategoryItem = (array) => array && array.map((el) => {
        return <div className={style.categoryListSubItem}>
                    <div>
                        <div className={style.categoryName}>{el.value.name}</div>
                        <div className={style.categoryBtn}>    
                            <Button
                                modify={'danger'}
                                id={el.value.id} 
                                label={'х'}
                                onClick={(e) => this.showDeleteModal(e)}
                            />
                            <Button
                                modify={'warning'}
                                id={el.value.id}
                                label={'+'}
                                onClick={(e) => this.showModal(e)}
                            />
                        </div>
                    </div>
                    {this.renderCategoryItem(el.children)}
            </div>
        }
    )
    
    render () {
        const {category} = this.props;
        return (
            <div>
                <div className="header">
                    <Input 
                        type="text"
                        placeholder="Название категории"
                        onChange={this.onChangeNewCategoryName}
                        value={this.state.newCategoryName}/>
                    <Button 
                        label={'Add'}
                        onClick={this.addNewCategory}/>
                </div>
                <div className={style.categoryList}>
                    {this.renderCategory(category)}
                </div>
                {this.state.showModal && 
                    <Modal closeModal={this.closeModal} modalBody={this.renderModalBody}>
                        <ModalEditCategory
                            addNewSubCategory={this.addNewSubCategory}
                            onChangeSubCategoryName={this.onChangeSubCategoryName}
                            categoryId={this.state.categoryId}
                            category={this.props.category}/>
                    </Modal>}
                {this.state.showDeleteModal && 
                <Modal closeModal={this.closeDeleteModal} modalBody={this.renderModalDeleteBody}>
                    <ModalDelete
                        modalText={'Вы дествительно хотите удалить эту Категорию?'}
                        closeDeleteModal={this.closeDeleteModal}
                        deleteItem={this.deleteCategory}
                        idItem={this.state.categoryId}/>
                </Modal>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    category: state.category
});

export default connect(mapStateToProps, {
    getCategory,
    addNewCategory,
    deleteCategory
})(Category);