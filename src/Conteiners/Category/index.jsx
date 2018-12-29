import React from 'react';
import {getCategory, addNewCategory, deleteCategory} from '../../Store/Actions/categoryAction';
import {connect} from 'react-redux';
import style from './style.styl';
import Input from '../../Components/input';
import Button from '../../Components/button';
import Modal from '../../Components/modal';

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newCategoryName: null,
            newSubCategoryName: null,
            showModal: false,
            idCategoryForModal: null,
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
            idCategoryForModal: e.target.id
        })
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    showDeleteModal = (e) => {
        this.setState({
            showDeleteModal: true,
            idCategoryForModal: e.target.id
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
            parentId: Number(this.state.idCategoryForModal)
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

    /**
     * Модалка подтверждения удаления
     */
    renderModalDeleteBody = () => {
        return (<div className={style.modal}>
            <div className={style.modalCaption}>
                <h3>Удаление категории: </h3>
            </div>
            <div className={style.modalBody}>
                <div className={style.modalItem}>
                    Вы дествительно хотите удалить эту Категорию?
                </div>
            </div>
            <div className={style.modalFooter}>
                <Button 
                    modify={'danger'}
                    label={'Удалить'}
                    onClick={() => this.deleteCategory(this.state.idCategoryForModal)}/>
                <Button 
                    label={'Отмена'}
                    onClick={() => this.closeDeleteModal()}/>
            </div>
        </div>)
    }
    /**
     * Модалка редактирования
     */

    renderModalBody = () => {
        let currentCategory = this.props.category.filter((el) => el.id == this.state.idCategoryForModal);
        return (<div>
            <div>
                {currentCategory && currentCategory.map((el) => {
                    return (<div className={style.modal}>
                            <div className={style.modalCaption}>
                                <h3>Добавление новой подкатегории: </h3>
                            </div>
                            <div className={style.modalBody}>
                                <div className={style.modalItem}>
                                    <Input 
                                        placeholder={'Введите название'}
                                        defaultValue={el.text}
                                        onChange={this.onChangeSubCategoryName}/>
                                </div>
                            </div>
                            <div className={style.modalFooter}>
                                <Button 
                                    label={'Добавить'}
                                    onClick={() => this.addNewSubCategory()}/>
                            </div>
                        </div>)
                })}
            </div>
        </div>)
    }
    
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
                {this.state.showModal && <Modal closeModal={this.closeModal} modalBody={this.renderModalBody}/>}
                {this.state.showDeleteModal && <Modal closeModal={this.closeDeleteModal} modalBody={this.renderModalDeleteBody}/>}
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