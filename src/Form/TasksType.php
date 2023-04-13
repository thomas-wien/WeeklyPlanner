<?php

namespace App\Form;

use App\Entity\Tasks;
use App\Entity\Status;
use Doctrine\DBAL\Types\TextType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType as TypeTextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Vich\UploaderBundle\Form\Type\VichFileType;
use Vich\UploaderBundle\Form\Type\VichImageType;

class TasksType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add(
                'taskname',
                TypeTextType::class,
                [
                    'attr' => ['class' => 'form-control', 'placeholder' => 'Please enter a Task Name', 'style' => 'margin-bottom:15px']
                ]
            )
            ->add(
                'shortDescription',
                TypeTextType::class,
                [
                    'attr' => ['class' => 'form-control', 'placeholder' => 'Please enter a short Description', 'style' => 'margin-bottom:15px']
                ]
            )
            ->add(
                'details',
                TypeTextType::class,
                [
                    'attr' => ['textarea class' => 'form-control', 'placeholder' => 'Please enter the details of the task', 'style' => 'height: 100px; margin-bottom:15px']
                ]
            )
            ->add('deadline')
            // ->add('image')
            ->add('imageFile', VichImageType::class, [
                'required' => false,
                'allow_delete' => false,
                // 'delete_label' => '...',
                // 'download_uri' => '...',
                'download_label' => false,
                'asset_helper' => true,
            ])
            ->add('priority')
            ->add('fk_status', EntityType::class, [
                // looks for choices from this entity
                'class' => Status::class,

                // uses the User.username property as the visible option string
                'choice_label' => 'name',

                // used to render a select box, check boxes or radios
                // 'multiple' => true,
                // 'expanded' => true,
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Tasks::class,
        ]);
    }
}
